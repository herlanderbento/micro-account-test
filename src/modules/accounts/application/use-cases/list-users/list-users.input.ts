import { UserFilter } from "~/modules/accounts/domain";
import { SortDirection } from "~/shared";


export type ListUsersInput = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: UserFilter | null;
};
