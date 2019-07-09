import { Except } from "./mod.ts";

type Foo = {
  unicorn: string;
  rainbow: boolean;
};

type FooWithoutRainbow = Except<Foo, "rainbow">;

const FooWithOnlyUnicorn: FooWithoutRainbow = {
  unicorn: "yes",
};

console.table(FooWithOnlyUnicorn);
