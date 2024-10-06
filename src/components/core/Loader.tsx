type Props = {
  loading?: boolean;
};
const Loader = ({ loading }: Props) => {
  return (
    <div
      className={`absolute z-[9999] flex h-full w-full items-center justify-center bg-white ${
        loading ? "block" : "hidden"
      }`}
    >
      <div className="relative h-52 w-52 rounded-full bg-white border-4 border-solid border-gray-300 shadow-lg">
        <div
          className="animate-spin h-52 w-52 rounded-full border-x-2 border-t-2 border-x-primary border-t-secondary"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <h1 className="absolute px-4 font-semibold text-blue-800 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          USER AUTH SYSTEM
        </h1>
      </div>
    </div>
  );
};

export default Loader;
