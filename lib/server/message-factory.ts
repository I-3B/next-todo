export const errMsgFactory = {
  get(resourceName: string) {
    return `Error getting ${resourceName}`;
  },
  notFound(resourceName?: string) {
    return resourceName
      ? `${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} not found`
      : "Not found";
  },
  create(resourceName: string) {
    return `Error creating ${resourceName}`;
  },
  update(resourceName: string) {
    return `Error updating ${resourceName}`;
  },
  delete(resourceName: string) {
    return `Error deleting ${resourceName}`;
  },
  invalid(resourceName: string) {
    return `Invalid ${resourceName}`;
  },
  exists(resourceName: string) {
    return `${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} already exists`;
  },
  somethingWentWrong() {
    return "Something went wrong";
  },
  custom(message: string) {
    return message.charAt(0).toUpperCase() + message.slice(1);
  },
};

export const respMsgFactory = {
  create(resourceName: string) {
    return `${resourceName} created`;
  },
  update(resourceName: string) {
    return `${resourceName} updated`;
  },
  delete(resourceName: string) {
    return `${resourceName} deleted`;
  },
};
