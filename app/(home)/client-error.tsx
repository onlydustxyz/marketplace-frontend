"use client";
export function ClientError() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeErrorObject = undefined as any;

  return <button onClick={() => fakeErrorObject.fakeMethod()}>{fakeErrorObject.test.test}</button>;
}
