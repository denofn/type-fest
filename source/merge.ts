import { Except } from "./except.ts";

/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```
import {Merge} from 'https://cdn.jsdelivr.net/gh/denoserverless/type-fest/mod.ts';

type Foo = {
	a: number;
	b: string;
};

type Bar = {
	b: number;
};

const ab: Merge<Foo, Bar> = {a: 1, b: 2};
```
*/
export type Merge<FirstType, SecondType> = Except<FirstType, Extract<keyof FirstType, keyof SecondType>> & SecondType;
