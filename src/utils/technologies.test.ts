import { getTopTechnologies, Technologies } from "./technologies";

describe("getTopTechnologies", () => {
  it("should return the names of the top three technologies based on usage", () => {
    const technologies: Technologies = {
      Java: 541,
      "C++": 11257921,
      CSS: 64012,
      C: 1826781,
      Scheme: 25324,
      CMake: 57776,
      "Objective-C++": 5497,
      QMake: 438,
      Makefile: 149089,
      M4: 217831,
      HTML: 142619,
      Sage: 59399,
      TypeScript: 21471,
      Dockerfile: 4534,
      Shell: 182000,
      CoffeeScript: 17480,
      "Cap'n Proto": 1256,
      JavaScript: 4114346,
      Assembly: 28366,
      Python: 3379652,
    };

    const expected = ["C++", "JavaScript", "Python"];
    const result = getTopTechnologies(technologies);

    expect(result).toEqual(expected);
  });
});
