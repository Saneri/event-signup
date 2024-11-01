type ToggleProps = {
  title: string;
  isOn: boolean;
  onToggle: () => void;
};

// This toggle CSS is copied from Flowbite and should be improved
const Toggle = (props: ToggleProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={props.isOn}
        onChange={props.onToggle}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900">
        {props.title}
      </span>
    </label>
  );
};

export default Toggle;
