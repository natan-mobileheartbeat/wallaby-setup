// @Flow
import {
  getIcapiNonclinicalBaseUrl,
  getRequestHeaders
} from '../utils/httpUtils';
import HttpClient from '../services/HttpClient';
import {
  getAssignedDynamicRoles,
  getNeedAssignDynamicRoles,
  getNeedReplaceDynamicRoles,
  getNeedUnAssignDynamicRoles,
  getSIPExtensionsAssignedDynamicRoles,
  isInRoles
} from '../selectors/dynamicRoleSelector';
import { getSyncContactByName } from '../selectors/contactsSelector';
import {
  routeToConfirmDynamicRoles,
  routeToUpdateDynamicRolesResult
} from './routeActions';
import { showGlobalError } from './alertsActions';

export const SET_DYNAMIC_ROLES = 'DYNAMIC_ROLE/SET_DYNAMIC_ROLES';
export const SET_SHOW_ASSIGN_DYNAMIC_ROLE_MODAL =
  'DYNAMIC_ROLE/SET_SHOW_ASSIGN_DYNAMIC_ROLE_MODAL';

export const CHECK_DYNAMIC_ROLE_FAILED = 'Check dynamic role failed.';

const MESSAGE_SEPARATOR = '-';
const ASSIGNED_SUCCESS_MESSAGE = 'Assigned';
const ASSIGNED_FAILED_MESSAGE_PREFIX = 'Assign Failed';
const UNASSIGNED_SUCCESS_MESSAGE = 'Unassigned';
const UNASSIGNED_FAILED_MESSAGE_PREFIX = 'Unassigned Failed';

export const setDynamicRoles = dynamicRolesData => ({
  type: SET_DYNAMIC_ROLES,
  payload: dynamicRolesData
});



export const getUserDynamicRoles = () => (dispatch: Function, getState: Function) => {
  const url = `/dynamic-roles`;
  return new HttpClient(dispatch)
    .get(url, null, getRequestHeaders(getState()), false)
    .then(json => {
      if (json && json.success) {
        const { accessibleRoles, recentRoles } = json;
        dispatch(setDynamicRoles({ accessibleRoles, recentRoles }));
        return new Promise((resolve, reject) => resolve(true));
      } else {
        dispatch(showGlobalError('Faild to get user dynamic roles'));
        return new Promise((resolve, reject) => reject(false));
      }
    })
    .catch(error => {
      dispatch(showGlobalError(error));
      return new Promise((resolve, reject) => reject(error));
    });
};



