export function OnlyDustLogo() {
  const logoUrl = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/logo.png`;

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "72px",
        alignItems: "center",
      }}
    >
      <img src={logoUrl} alt="logo" width="54" height="54" style={{ marginRight: "16px" }} />
      <svg width="146" height="32" viewBox="0 0 500 109" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M245.46 77.5311L245.461 77.509V77.4929C245.469 70.8145 245.48 62.3357 245.48 54.9606H245.51V2.4206C245.51 1.4206 246.31 0.630596 247.3 0.630596C250.551 0.653075 253.919 0.62818 257.333 0.602946C266.068 0.538377 275.104 0.471589 283.25 1.1906C301.37 2.7906 313.95 14.9906 317.36 32.9306C319.49 44.1706 319.09 55.3106 314.54 65.9706C309.08 78.7606 299.26 86.4706 285.58 88.3506C279.998 89.1193 274.307 89.1241 268.623 89.129C266.395 89.1308 264.169 89.1327 261.95 89.1806L247.24 89.2306C246.25 89.2306 245.45 88.4406 245.45 87.4506C245.45 85.4367 245.455 81.8649 245.46 77.5311ZM277.33 76.3906C288.06 75.7206 296.17 70.8706 300.37 60.6406L300.38 60.6206C303.61 52.7206 303.92 44.4406 302.44 36.1506C300.08 22.9306 292.7 15.5806 279.44 13.6806C275.4 13.1006 266.33 13.1606 262.49 13.2206C261.5 13.2406 260.73 14.0406 260.73 15.0206C260.787 21.6291 260.773 29.3989 260.76 36.5648L260.76 36.6126C260.755 39.5141 260.75 42.3159 260.75 44.9006V74.7006C260.75 75.6906 261.55 76.4906 262.54 76.4906C263.983 76.4844 265.535 76.4983 267.117 76.5125H267.12C270.659 76.5441 274.352 76.5771 277.33 76.3906Z"
          fill="#F3F0EE"
        />
        <path
          d="M500 49.5206L499.999 49.5406H499C499 49.5406 498.92 51.0906 498.83 51.8706C498.14 58.0306 496.84 64.0306 493.89 69.5406C491.92 73.2306 489.34 76.3906 485.41 78.1606C478.04 81.5006 472.29 77.9106 472.27 69.9506C472.257 65.28 472.261 60.1464 472.265 54.925V54.9227C472.27 47.9148 472.275 40.7481 472.24 34.3306C472.23 33.3406 473.04 32.5406 474.03 32.5406L488.62 32.5606C489.61 32.5606 490.41 31.7606 490.41 30.7706V21.4306C490.41 20.4406 489.61 19.6406 488.62 19.6406H474.06C473.07 19.6406 472.27 18.8406 472.27 17.8506C472.27 15.6484 472.273 12.5547 472.276 9.60608L472.276 9.53816V9.46569C472.278 6.77524 472.28 4.21976 472.28 2.5906C472.28 1.6006 471.48 0.800596 470.49 0.800596H459.94C458.95 0.800596 458.15 1.6006 458.15 2.5906L458.18 17.8406C458.18 18.8306 457.38 19.6306 456.39 19.6306H448.12C447.13 19.6306 446.33 20.4206 446.33 21.4106L446.31 30.7106C446.3 31.7006 447.11 32.5006 448.1 32.5006C449.629 32.4943 451.659 32.4998 453.499 32.5048L453.5 32.5048C454.597 32.5078 455.626 32.5106 456.44 32.5106C457.43 32.5206 458.21 33.3206 458.2 34.3006V72.0106C458.22 74.4406 458.46 76.9206 459.02 79.2806C460.46 85.3606 464.21 89.2406 470.49 90.4406C479.13 92.0906 487.91 87.8006 492.79 79.4506C498.007 70.5365 499.528 59.635 499.999 49.5406H500.01L500 49.5206Z"
          fill="#F3F0EE"
        />
        <path
          d="M399.53 66.9506C399.32 66.1806 398.61 65.6506 397.81 65.6506V65.6606H388.33C387.23 65.6606 386.39 66.6506 386.56 67.7406C387.47 73.4606 389.64 79.1806 394.01 83.0706C402.34 90.4706 412.35 91.6906 422.89 90.3006C428.96 89.5006 434.42 87.1306 438.91 82.7906C450.39 71.6606 446.62 54.8906 431.4 50.5306C427.748 49.4823 423.927 49.0067 420.108 48.5313C418.353 48.3129 416.598 48.0945 414.86 47.8206C413.823 47.6557 412.78 47.5179 411.738 47.3802C409.492 47.0837 407.249 46.7874 405.07 46.2206C401.05 45.1706 399.49 42.5206 400.51 38.4906C400.94 36.7606 402 34.9306 403.3 33.7206C409.14 28.3106 422.06 28.8906 427.46 34.7206C428.51 35.8506 429.31 37.2706 430.04 38.6506C430.73 39.8506 431.21 41.0406 431.52 41.8806C431.78 42.5906 432.45 43.0506 433.2 43.0506H442.35C443.47 43.0506 444.32 42.0206 444.11 40.9206C442.68 33.2806 438.84 26.0006 431.69 22.3606C422.08 17.4706 412.08 17.1706 402.09 20.9406C394.6 23.7606 389.54 29.1306 387.95 37.1506C386.03 46.8506 388.83 54.6306 399.44 57.0406C402.621 57.7676 405.869 58.1913 409.119 58.6152C410.876 58.8442 412.633 59.0734 414.38 59.3506C415.491 59.5269 416.61 59.6836 417.729 59.8403C420.991 60.2973 424.258 60.755 427.37 61.7006C432.13 63.1406 433.98 67.8106 431.85 72.1406C431.03 73.8106 429.52 75.3506 427.96 76.4206C424.15 79.0206 419.74 79.4406 415.24 79.2006C405.88 78.6006 401.44 74.1806 399.53 66.9506Z"
          fill="#F3F0EE"
        />
        <path
          d="M380.1 89.2906C381.09 89.2906 381.89 88.4906 381.89 87.5006H381.9V21.3306C381.91 20.3306 381.1 19.5306 380.11 19.5306H369.69C368.71 19.5306 367.91 20.3206 367.91 21.3106V74.8206C367.91 75.8006 367.11 76.5906 366.13 76.5906H340.69C339.7 76.5906 338.9 75.8006 338.9 74.8106L338.9 71.3038C338.899 60.1139 338.896 34.0145 338.94 21.3206C338.94 20.3306 338.14 19.5406 337.15 19.5406H326.44C325.45 19.5406 324.65 20.3306 324.65 21.3206C324.71 41.6106 324.71 67.0606 324.65 87.5106C324.65 88.5006 325.45 89.2906 326.44 89.2906H380.1Z"
          fill="#F3F0EE"
        />
        <path
          d="M204.51 108.43C201.14 108.39 197.78 108.37 194.41 108.37C191.04 108.37 187.57 108.39 184.15 108.43H183.76C182.95 108.43 182.18 108.39 181.65 107.84C181.19 107.37 181.02 106.64 181.06 105.42C181.06 105.42 181.11 100.47 181.08 97.9204C181.05 96.9904 181.24 96.3405 181.68 95.9005C182.25 95.3105 183.1 95.2404 183.69 95.2404L196.2 95.2804L196.209 95.2803C197.711 95.2604 197.982 95.2569 198.75 93.3504C200.35 88.2004 200.31 84.5005 198.6 80.1905C192.83 65.6505 174.95 19.5005 174.95 19.5005L187.67 19.4704C189.44 19.4704 190.45 20.1904 191.05 21.8904C193.866 29.8773 198.661 42.8913 202.531 53.3962L202.537 53.4121C204.974 60.0252 207.043 65.6418 208.02 68.3804C208.893 65.8874 210.651 61.0082 212.747 55.1919L212.747 55.1897L212.749 55.1842C216.731 44.1337 221.931 29.704 224.59 21.8305C225.16 20.1404 226.06 19.4604 227.7 19.4604L240.69 19.5005C240.69 19.5005 215.24 86.6505 208.14 105.79C207.63 107.16 206.85 108.42 204.6 108.42H204.52L204.51 108.43Z"
          fill="#F3F0EE"
        />
        <path
          d="M170.64 85.8406V54.3506L170.63 54.3606C170.63 51.9793 170.628 48.6637 170.625 44.8285V44.8116C170.615 31.3658 170.6 11.5458 170.67 3.20056C170.69 1.22056 170.06 0.560557 168.11 0.640557C165.02 0.630557 162.23 0.630557 159.12 0.640557C157.33 0.650557 156.58 1.16056 156.58 3.06056C156.63 24.7606 156.62 65.4306 156.58 87.1306C156.58 88.8106 157.2 89.3506 158.8 89.3106C160.732 89.2545 162.67 89.2672 164.605 89.2798C165.434 89.2852 166.262 89.2906 167.09 89.2906C169.457 89.2839 170.64 88.1339 170.64 85.8406Z"
          fill="#F3F0EE"
        />
        <path
          d="M93.6602 21.3405C93.6602 20.3505 94.4702 19.5505 95.4602 19.5505H149.12C150.11 19.5505 150.91 20.3405 150.91 21.3305C150.85 41.7805 150.85 67.2305 150.91 87.5205C150.91 88.5105 150.11 89.3005 149.12 89.3005H138.41C137.42 89.3005 136.62 88.5105 136.62 87.5205C136.665 74.8248 136.662 48.7195 136.661 37.5324L136.66 34.0305C136.66 33.0405 135.86 32.2505 134.87 32.2505H109.43C108.45 32.2505 107.65 33.0405 107.65 34.0205V87.5305C107.65 88.5205 106.85 89.3105 105.87 89.3105H95.4502C94.4602 89.3105 93.6502 88.5105 93.6602 87.5105V21.3405Z"
          fill="#F3F0EE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-0.000177048 45.3906C-0.0901771 70.2806 19.3498 89.9006 44.1398 89.9406C69.2298 89.9806 88.4898 70.7306 88.5398 45.5406C88.5898 20.9206 69.2198 1.54061 44.5098 1.48061C19.6598 1.42061 0.089823 20.7406 -0.000177048 45.3906ZM44.8398 75.7506C28.0998 75.8506 15.0398 62.6806 14.9698 45.6106C14.8998 29.0506 27.9498 15.6806 44.2798 15.6106C60.4498 15.5406 73.6898 28.9506 73.7898 45.5106C73.8898 61.8906 60.7098 75.6506 44.8398 75.7506Z"
          fill="#F3F0EE"
        />
      </svg>
    </div>
  );
}