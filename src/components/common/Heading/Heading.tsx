import { memo } from "react";
const Heading = memo(({ title }: { title: string }) => {


  return (
    <div>
      <h2 className="mb-3" style={{ fontSize: "26px" }}>
        {title}
      </h2>
    </div>
  );
});

export default Heading;
