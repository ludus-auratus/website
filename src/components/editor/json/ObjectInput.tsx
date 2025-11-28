export function ObjectInput<T extends object>({ object, update }: { object: T; update: (obj: T) => void }) {
  return (
    <div className="space-y-2">
      {Object.keys(object).map((key, index) => {
        const value = (object as Record<string, unknown>)[key];
        if (!(value instanceof Date) && typeof value === "object") {
          return (
            <div key={index}>
              <h3 className="border-primary border-b-1">{key}</h3>
              <div className="bg-ludus-green-950/25 rounded-b-md p-2 pl-8">
                <ObjectInput
                  object={value!}
                  update={(obj) => {
                    update({
                      ...object,
                      [key]: {
                        ...obj,
                      },
                    });
                  }}
                />
              </div>
            </div>
          );
        }

        let inputValue = `${value}`;
        let inputType;
        let inputParser;
        switch (typeof value) {
          case "number":
            inputType = "number";
            inputParser = Number.parseFloat;
            break;
          default:
            inputType = "text";
            inputParser = (value: string) => value;
            break;
        }

        if (value instanceof Date) {
          inputValue = value.toISOString().split("T")[0];
          inputType = "date";
          inputParser = (value: string) => new Date(value);
        }

        return (
          <div key={index} className={"flex flex-col"}>
            <label>{key}</label>
            <input
              type={inputType}
              className="bg-background border-primary rounded-md border-1 p-2 shadow-md"
              value={inputValue}
              onChange={(ev) =>
                update({
                  ...object,
                  [key]: inputParser(ev.target.value),
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}
