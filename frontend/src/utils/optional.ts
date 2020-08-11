import {ReactNode} from 'react';

export default class Optional<T> {
    private constructor(private readonly value?: T) {}

    public static of<T>(value: T): Optional<T> {
        return new Optional(value)
    }

    public static empty<T>(): Optional<T> {
        return new Optional<T>();
    }

    public static fromNullable<T>(value: T | undefined | null) {
        if (value === undefined || value === null) {
            return Optional.empty;
        }
        return Optional.of(value);
    }

    public map<S>(f: (t: T) => S): Optional<S> {
        if (this.isEmpty) {
            return Optional.empty();
        }
        return Optional.of(f(this.get));
    }

    public mapToComponent(f: (t: T) => ReactNode): ReactNode {
        return this.map(f).orElse(null);
    }

    public orElse<S>(defaultValue: S): T | S {
        return this.isEmpty
            ? defaultValue
            : this.get;
    }

    public get isEmpty(): boolean {
        return this.value === undefined;
    }

    public get orNull(): T | null {
        return this.orElse(null);
    }

    public get get(): T {
        if (this.isEmpty) {
            throw new Error("Attempted to unwrap empty optional")
        }
        return this.value as T;
    }
}
