import Spinner from './spinner';

export default function FullScreenLoader({ size = 60 }: { size?: number }) {
  return (
    <div className="w-full h-full flex flex-col justify-center min-h-[100vh]">
      <Spinner size={size} />
    </div>
  );
}
