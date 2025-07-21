import { PageTransissionWrapper } from "../transissions/page-transission";

export function CreateWidget() {
  return (
    <>
      <PageTransissionWrapper>
        <div className="h-screen w-full border-4 bg-primary flex justify-center align-middle">
          <h1>create widget</h1>
        </div>
      </PageTransissionWrapper>
    </>
  );
}
