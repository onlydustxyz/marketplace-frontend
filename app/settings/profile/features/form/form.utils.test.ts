import { AnyType } from "core/helpers/types";
import { describe, expect, it } from "vitest";

import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { TProfileForm } from "./form.types";
import { createContact, formatToData, formatToSchema, sanitizeContactHandle } from "./form.utils";

type formData = Omit<TProfileForm.Data, "notifications">;

describe("sanitizeContactHandle", () => {
  it("should remove trailing slash", () => {
    const result = sanitizeContactHandle("contact/");
    expect(result).toBe("contact");
  });

  it("should extract handle after last slash", () => {
    const result = sanitizeContactHandle("https://example.com/contact");
    expect(result).toBe("contact");
  });

  it("should remove @ from the beginning", () => {
    const result = sanitizeContactHandle("@contact");
    expect(result).toBe("contact");
  });
});

describe("createContact", () => {
  it("should create a TELEGRAM contact with sanitized handle", () => {
    const result = createContact({
      channel: "TELEGRAM",
      contact: "@contact",
      isPublic: true,
      prefixUrl: "https://t.me/",
    });
    expect(result).toEqual({
      channel: "TELEGRAM",
      contact: "https://t.me/contact",
      visibility: "public",
    });
  });

  it("should create a LINKEDIN contact with sanitized URL", () => {
    const result = createContact({
      channel: "LINKEDIN",
      contact: "https://www.linkedin.com/in/foobar",
      isPublic: true,
      prefixUrl: "https://www.linkedin.com/in/",
    });
    expect(result).toEqual({
      channel: "LINKEDIN",
      contact: "https://www.linkedin.com/in/foobar",
      visibility: "public",
    });
  });

  it("should create a TWITTER contact with sanitized handle", () => {
    const result = createContact({
      channel: "TWITTER",
      contact: "@foobar",
      isPublic: true,
      prefixUrl: "https://x.com/",
    });
    expect(result).toEqual({
      channel: "TWITTER",
      contact: "https://x.com/foobar",
      visibility: "public",
    });
  });

  it("should create a WHATSAPP contact correctly without prefix URL", () => {
    const result = createContact({
      channel: "WHATSAPP",
      contact: "1234567890",
      isPublic: false,
    });
    expect(result).toEqual({
      channel: "WHATSAPP",
      contact: "1234567890",
      visibility: "private",
    });
  });

  it("should handle DISCORD contact correctly without prefix URL", () => {
    const result = createContact({
      channel: "DISCORD",
      contact: "user#1234",
      isPublic: true,
    });
    expect(result).toEqual({
      channel: "DISCORD",
      contact: "user#1234",
      visibility: "public",
    });
  });
});

describe("formatToData", () => {
  const baseMockData = {
    githubUserId: 123,
    htmlUrl: "http://github.com/123",
    id: "123",
    login: "user",
  };

  it("should format profile info correctly", () => {
    const mockData: UseGetMyProfileInfoResponse = {
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      location: "Earth",
      bio: "Just a bio",
      website: "https://example.com",
      contacts: [
        {
          channel: "TELEGRAM",
          contact: "https://t.me/contact",
          visibility: "public",
        },
        {
          channel: "DISCORD",
          contact: "user#1234",
          visibility: "private",
        },
      ],
      allocatedTimeToContribute: TProfileForm.ALLOCATED_TIME.NONE,
      isLookingForAJob: true,
      contactEmail: "john@mail.com",
      ...baseMockData,
    };

    const expectedData: formData = {
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      location: "Earth",
      bio: "Just a bio",
      contactEmail: "john@mail.com",
      website: "https://example.com",
      telegram: { contact: "contact", isPublic: true },
      whatsapp: { contact: "", isPublic: false },
      twitter: { contact: "", isPublic: false },
      discord: { contact: "user#1234", isPublic: false },
      linkedin: { contact: "", isPublic: false },
      weeklyAllocatedTime: TProfileForm.ALLOCATED_TIME.NONE,
      lookingForAJob: true,
    };

    const result = formatToData(mockData, { notificationSettings: [] } as AnyType);
    expect(result).toEqual(expectedData);
  });

  it("should handle partial data correctly", () => {
    const mockData: UseGetMyProfileInfoResponse = {
      firstName: "John",
      avatarUrl: "https://example.com/avatar.jpg",
      location: "Mars",
      bio: "Another bio",
      isLookingForAJob: false,
      contactEmail: "john@mail.com",
      ...baseMockData,
    };

    const expectedData: formData = {
      firstName: "John",
      lastName: "",
      avatarUrl: "https://example.com/avatar.jpg",
      location: "Mars",
      bio: "Another bio",
      contactEmail: "john@mail.com",
      website: "",
      telegram: { contact: "", isPublic: false },
      whatsapp: { contact: "", isPublic: false },
      twitter: { contact: "", isPublic: false },
      discord: { contact: "", isPublic: false },
      linkedin: { contact: "", isPublic: false },
      weeklyAllocatedTime: TProfileForm.ALLOCATED_TIME.NONE,
      lookingForAJob: false,
    };

    const result = formatToData(mockData, { notificationSettings: [] } as AnyType);
    expect(result).toEqual(expectedData);
  });
});

describe("formatToSchema", () => {
  it("should convert formatted data to schema correctly", () => {
    const formattedData: formData = {
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      location: "Earth",
      bio: "Just a bio",
      website: "https://example.com",
      telegram: { contact: "contact", isPublic: true },
      whatsapp: { contact: "contact", isPublic: true },
      twitter: { contact: "contact", isPublic: true },
      discord: { contact: "contact", isPublic: true },
      linkedin: { contact: "contact", isPublic: true },
      weeklyAllocatedTime: TProfileForm.ALLOCATED_TIME.ONE_TO_THREE_DAYS,
      lookingForAJob: true,
    };

    const expectedSchema = {
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      location: "Earth",
      bio: "Just a bio",
      website: "https://example.com",
      contacts: [
        {
          channel: "TELEGRAM",
          contact: "https://t.me/contact",
          visibility: "public",
        },
        {
          channel: "WHATSAPP",
          contact: "contact",
          visibility: "public",
        },
        {
          channel: "TWITTER",
          contact: "https://x.com/contact",
          visibility: "public",
        },
        {
          channel: "DISCORD",
          contact: "contact",
          visibility: "public",
        },
        {
          channel: "LINKEDIN",
          contact: "https://www.linkedin.com/in/contact",
          visibility: "public",
        },
      ],
      allocatedTimeToContribute: TProfileForm.ALLOCATED_TIME.ONE_TO_THREE_DAYS,
      isLookingForAJob: true,
    };

    const result = formatToSchema(formattedData);
    expect(result).toEqual(expectedSchema);
  });

  it("should handle partial data correctly", () => {
    const partialData: formData = {
      firstName: "John",
      lastName: undefined,
      avatarUrl: undefined,
      location: undefined,
      bio: undefined,
      website: undefined,
      telegram: { contact: "", isPublic: false },
      whatsapp: { contact: "", isPublic: false },
      twitter: { contact: "", isPublic: false },
      discord: { contact: "", isPublic: false },
      linkedin: { contact: "", isPublic: false },
      weeklyAllocatedTime: TProfileForm.ALLOCATED_TIME.NONE,
      lookingForAJob: false,
    };

    const expectedSchema = {
      firstName: "John",
      lastName: undefined,
      avatarUrl: undefined,
      location: undefined,
      bio: undefined,
      website: undefined,
      contacts: [
        { channel: "TELEGRAM", contact: "", visibility: "private" },
        { channel: "WHATSAPP", contact: "", visibility: "private" },
        { channel: "TWITTER", contact: "", visibility: "private" },
        { channel: "DISCORD", contact: "", visibility: "private" },
        { channel: "LINKEDIN", contact: "", visibility: "private" },
      ],
      allocatedTimeToContribute: TProfileForm.ALLOCATED_TIME.NONE,
      isLookingForAJob: false,
    };

    const result = formatToSchema(partialData);
    expect(result).toEqual(expectedSchema);
  });
});
