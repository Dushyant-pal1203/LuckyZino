import { Shine } from './shine';

export const Maskot = () => {
  return (
    <div className="w-full h-[10.5rem] relative">
      <Shine></Shine>
      <Shine startAngle={10} endAngle={-10}></Shine>
      <div
        className="w-full h-full bg-[length:50%] bg-top bg-no-repeat relative z-2"
        style={{
          backgroundImage:
            'url(/images/auth/zuzu.png), image-set(url("/images/auth/zuzu.webp") type("image/webp"), url("/images/auth/zuzu.png") type("image/png")'
        }}
      ></div>
    </div>
  );
};
