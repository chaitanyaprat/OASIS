import { ColorRing } from "react-loader-spinner";

export function LogInSpinner() {
  return (
    <>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={[
          "--color-foreground",
          "--color-popover",
          "--color-secondary",
          "--color-accent",
          "--color-ring",
        ]}
      />
    </>
  );
}

export function LogOutSpinner() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 z-200  flex items-center justify-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={[
          "--color-foreground",
          "--color-popover",
          "--color-secondary",
          "--color-accent",
          "--color-ring",
        ]}
      />
    </div>
  );
}

export function CTASpinner() {
  return (
    <div className=" flex items-center justify-center">
      <ColorRing
        visible={true}
        height="20"
        width="20"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={[
          "--color-foreground",
          "--color-popover",
          "--color-secondary",
          "--color-accent",
          "--color-ring",
        ]}
      />
    </div>
  );
}
