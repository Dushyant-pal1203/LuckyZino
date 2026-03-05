const CrossPromoPage = () => {
  return (
    <>
      <div
        className="flex-col justify-between h-full hidden md:flex"
        style={{ backgroundColor: "rgba(46, 21, 110, 0.98)" }}
      >
        <div className="flex flex-col items-center justify-start px-5 py-8 md:px-20">
          <div className="max-w-6xl w-full flex flex-col items-center gap-8">
            <div className="w-auto">
              <picture>
                <source
                  srcSet="/images/crosspromo/header.webp"
                  type="image/webp"
                />
                <img
                  src="/images/crosspromo/header.png"
                  alt="We Recommend"
                  className="h-8 w-auto"
                />
              </picture>
            </div>
            <div className="relative inline-block">
              <picture>
                <source
                  srcSet="/images/crosspromo/main-screen.webp"
                  type="image/webp"
                />
                <img
                  src="/images/crosspromo/main-screen.png"
                  alt="DreamApp Recommendation"
                  className="w-auto h-auto max-w-[60vw] block rounded-2xl shadow-2xl"
                />
              </picture>
              <div className="absolute bottom-[25%] left-[8%] w-[35%] h-[12%] flex space-x-1">
                <a
                  href="https://apps.apple.com/us/app/dreamapp-dream-interpretation/id1524421486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[50%] h-full bg-transparent"
                  aria-label="Download on App Store"
                ></a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.dreamapp.app&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[50%] h-full bg-transparent"
                  aria-label="Get it on Google Play"
                ></a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-auto">
          <picture>
            <source srcSet="/images/crosspromo/footer.webp" type="image/webp" />
            <img
              src="/images/crosspromo/footer.png"
              alt="LuckyZino Footer"
              className="w-full h-auto block"
            />
          </picture>
        </div>
      </div>

      {/*Mobile*/}
      <div
        className="bg-gray-100 grid grid-rows-[5%_68%_5%_22%] h-[calc(100vh-58px)] w-full md:hidden"
        style={{ backgroundColor: "rgba(46, 21, 110, 0.98)" }}
      >
        <div className="py-1.5">
          <picture className="h-full w-auto">
            <source srcSet="/images/crosspromo/header.webp" type="image/webp" />
            <img
              src="/images/crosspromo/header.png"
              alt="We Recommend"
              className="object-contain h-full w-auto m-auto"
            />
          </picture>
        </div>
        <div
          className="relative py-3"
          style={{ backgroundColor: "rgba(192, 191, 236, 1)" }}
        >
          <picture>
            <source
              srcSet="/images/crosspromo/bg-phone.webp"
              type="image/webp"
            />
            <img
              src="/images/crosspromo/bg-phone.png"
              alt="DreamApp Bg"
              className="h-full w-full absolute top-0 left-0"
            />
          </picture>

          <picture className="h-full w-auto">
            <source
              srcSet="/images/crosspromo/content-phone.webp"
              type="image/webp"
            />
            <img
              src="/images/crosspromo/content-phone.png"
              alt="DreamApp Content"
              className="object-contain h-full w-auto m-auto"
            />
          </picture>
          <div className="absolute bottom-[7%] left-0 right-0 m-auto w-[50%] h-[8%] flex space-x-4">
            <a
              href="https://apps.apple.com/us/app/dreamapp-dream-interpretation/id1524421486"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[50%] h-full bg-transparent"
              aria-label="Download on App Store"
            ></a>
            <a
              href="https://play.google.com/store/apps/details?id=com.dreamapp.app&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[50%] h-full bg-transparent"
              aria-label="Get it on Google Play"
            ></a>
          </div>
        </div>
        <div
          className="py-1.5 px-3"
          style={{ backgroundColor: "rgba(64, 73, 87, 1)" }}
        >
          <picture className="h-full w-auto">
            <source
              srcSet="/images/crosspromo/logos-phone.webp"
              type="image/webp"
            />
            <img
              src="/images/crosspromo/logos-phone.png"
              alt="Lucky Zino Logos"
              className="object-contain h-full w-auto m-auto"
            />
          </picture>
        </div>
        <div
          className="py-1.5"
          style={{ backgroundColor: "rgba(105, 41, 216, 1)" }}
        >
          <picture className="h-full w-auto">
            <source
              srcSet="/images/crosspromo/footer-phone.webp"
              type="image/webp"
            />
            <img
              src="/images/crosspromo/footer-phone.png"
              alt="Lucky Zino Footer"
              className="object-contain h-full w-auto m-auto"
            />
          </picture>
        </div>
      </div>
    </>
  );
};

export default CrossPromoPage;
