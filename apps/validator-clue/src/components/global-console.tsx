export default function GlobalConsole({
  notifications,
}: {
  notifications: any[];
}) {
  const valName = "Me";
  return (
    <div className="flex h-[284px] w-full flex-col rounded-sm bg-foreground text-white xl:h-[710px] xl:max-w-[278px]">
      <div className="flex h-full flex-col-reverse gap-2 overflow-hidden overflow-y-auto p-2 text-xs">
        {notifications.map((value, index) => (
          <>
            {value.type === "obituary" ? (
              <div key={index} className="whitespace-normal">
                <span className="uppercase text-sky-300">
                  {value.timestamp}
                  <br /> [{value.type}]:
                </span>{" "}
                {value.payload.accused} is out
              </div>
            ) : (
              <div key={index}>
                <span className="uppercase text-sky-300">
                  {value.timestamp}
                  <br /> [{value.type}]:
                </span>{" "}
                {value.message}
              </div>
            )}
          </>
        ))}
      </div>
      <div className="w-full rounded-b-sm bg-primary px-3 py-2 text-sm font-bold leading-7 text-secondary">
        ~/ValClue/{valName}
      </div>
    </div>
  );
}