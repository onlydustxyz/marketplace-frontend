// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
type Constructor<T = anyType> = new (...args: anyType[]) => T;

export function extendMultipleClasses<TBase extends Constructor, TMixins extends Constructor[]>(
  Base: TBase,
  ...mixins: TMixins
) {
  return mixins.reduce(acc => {
    return class extends acc {
      constructor(...args: anyType[]) {
        super(...args);

        // TODO : @alexbeno keep this for try if it works before remove
        // Object.assign(this, new Mixin(args[0]));
      }
    };
  }, Base) as new (...args: ConstructorParameters<TBase>) => InstanceType<TBase> & InstanceType<TMixins[number]>;
}
