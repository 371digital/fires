export type UpdateValueDetails = {
  key: string;
  value: string | object;
};

export type JsonTask = {
  operationName: "updateValue";
  targetPath: string;
  parameters: UpdateValueDetails;
};
