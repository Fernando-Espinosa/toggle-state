import MasterView from "./modules/MasterView";

export const App = () => {
  const envVar = process.env.NEW_VAR;
  console.log(envVar);
  return <MasterView />;
};
