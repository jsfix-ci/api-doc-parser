import { Parameter } from "../Parameter";
import fetchResource from "./fetchResource";

export default (resource, options = {}) =>
  fetchResource(resource.url, options).then(({ parameters = [] }) => {
    const resourceParameters: Parameter[] = [];
    parameters.forEach(({ property = null, required, variable }) => {
      if (null === property) {
        return;
      }

      const { range = null } =
        resource.fields.find(({ name }) => property === name) || {};

      resourceParameters.push(new Parameter(variable, range, required, ""));
    });
    resource.parameters = resourceParameters;

    return resourceParameters;
  });
