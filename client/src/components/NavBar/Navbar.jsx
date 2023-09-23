const Navbar = () => {
  return (
    <div className="flex justify-between p-3 bg-cyan-950">
      <div>Logo</div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div className="flex gap-4 font-medium ">
        <div className=" text-white border-solid border-2 p-2">Login</div>
        <div className=" text-white border-solid border-2 p-2">Sign Up</div>
      </div>
    </div>
  );
};
export default Navbar;
