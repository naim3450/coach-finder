import FeturedCard from "./shared/feturedCard";
import { FeturedData } from "../../data/Data";

const FeturedCategories = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className=" ">
          <div className="">
            <h3 className="text-primaryColor  font-extrabold md:text-[48px] text-[5vw] text-center">
              Featured Industries
            </h3>
            <p className="text-primaryColor text-base font-medium lg:w-[680px] mx-auto text-center mt-2">
              These are the industries Coach Finder offers. The featured
              industries should cover your desired group fields.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          {FeturedData.map((data) => (
            <FeturedCard
              key={data.id}
              src={data.src}
              htext={data.htext}
              ptext={data.ptext}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeturedCategories;
