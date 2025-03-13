const Page1 = () => {
  return (
    <div className="">
      <div className="p-5">Palette</div>
      <div className="flex flex-wrap gap-5">
        <div className="bg-primary border border-gray-200 p-15 rounded-2xl"></div>
        <div className="bg-accent p-15 rounded-2xl"></div>
        <div className="bg-secondary p-15 rounded-2xl text-white"></div>
        <div className="bg-destructive p-15 rounded-2xl"></div>
        <div className="bg-popover p-15 rounded-2xl"></div>
        <div className="bg-accent p-15 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Page1;
