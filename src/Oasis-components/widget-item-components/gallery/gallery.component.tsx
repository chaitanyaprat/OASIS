import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PhotoData } from "./gallery.modal";
import { WidgetData } from "@/Oasis-components/widget-card/widget.interface";
import Autoplay from "embla-carousel-autoplay";
function GalleryWidget({
  gallery,
}: {
  gallery: PhotoData[];
  widgetData: WidgetData;
}) {
  return (
    <>
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
      >
        <CarouselContent>
          {gallery.map((eachPhoto) => {
            return (
              <CarouselItem>
                <div
                  className=" aspect-square p-1       
            w-full h-full
            grid
            grid-rows-[5fr_1fr]"
                >
                  <div className="overflow-auto rounded-xl mt-2 ">
                    <img
                      src={eachPhoto.imageUrl}
                      className="w-auto h-[100%] mx-auto"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    <p className=" font-medium">{eachPhoto.description}</p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
export default GalleryWidget;
