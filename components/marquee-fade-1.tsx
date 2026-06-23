import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";

export const title = "Edge fade";

const items = ["Analytics", "Automation", "Collaboration", "Integrations"];

const Example = () => (
  <div className="w-full max-w-md">
    <Marquee>
      <MarqueeContent>
        {items.map((item) => (
          <MarqueeItem key={item}>
            <span className="px-4 text-sm font-medium">{item}</span>
          </MarqueeItem>
        ))}
      </MarqueeContent>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
    </Marquee>
  </div>
);

export default Example;
