import { Search } from "lucide-react";
import { Form } from "react-router";

const SearchBar = () => {
  return (
    <div className="w-full">
      <div>
        <div className="border-x-divider relative w-full rounded-full border">
          <Form action="/explore">
            <label>
              <span className="absolute top-1/2 left-2 -translate-y-1/2">
                <Search className="stroke-x-text-sec size-4 stroke-2" />
              </span>
              <input
                className="text-x-text focus-within:outline-x-blue h-full w-full rounded-full border-0 py-3 pr-4 pl-8 text-xs font-normal outline-0 transition-all duration-50 focus:outline-2"
                type="text"
                placeholder="Search"
              />
            </label>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
