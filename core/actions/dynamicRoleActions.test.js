import { mockState } from '../test/testData';
import { dynamicRoleOriginalData } from '../test/dynamicRoleMockData';
import {
  checkAndUpdateUserDynamicRoles,
  getUserDynamicRoles,
  SET_SHOW_ASSIGN_DYNAMIC_ROLE_MODAL,
  setDynamicRoles,
  setShowAssignDynamicRoleModal
} from './dynamicRoleActions';

beforeEach(() => {
  fetch.resetMocks();
});

describe('setShowAssignDynamicRoleModal', () => {
  it('creates an action for show assign dynamic role modal', () => {
    const action = setShowAssignDynamicRoleModal(true);
    expect(action).toEqual({
      type: SET_SHOW_ASSIGN_DYNAMIC_ROLE_MODAL,
      payload: true
    });
  });
});

describe('getUserDynamicRoles', () => {
  it('should dispatch the correct actions for get uer dynamic role successful', async done => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => {
      return { ...mockState };
    });
    const unwrappedGetUserDynamicRoles = getUserDynamicRoles();
    fetch.mockResponseOnce(
      JSON.stringify({ success: true, ...dynamicRoleOriginalData })
    );

    await unwrappedGetUserDynamicRoles(mockDispatch, mockGetState);

    expect(mockGetState).toHaveBeenCalled();
    expect(mockDispatch.mock.calls).toEqual([
      [setDynamicRoles(dynamicRoleOriginalData)]
    ]);
    done();
  });
});

describe('checkAndUpdateUserDynamicRoles', () => {
  it('should dispatch the correct actions for update uer dynamic roles successful', async done => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => {
      return { ...mockState };
    });
    const testAssignRoles = [{ id: 24 }, { id: 25 }, { id: 26 }];
    const unwrappedCheckAndUpdateUserDynamicRoles = checkAndUpdateUserDynamicRoles(
      testAssignRoles
    );
    fetch.mockResponse(JSON.stringify({ success: true }));

    await unwrappedCheckAndUpdateUserDynamicRoles(mockDispatch, mockGetState);

    expect(mockGetState).toHaveBeenCalled();
    const [[firstCall], [secondCall]] = mockDispatch.mock.calls;
    expect(typeof firstCall).toEqual('function');
    expect(typeof secondCall).toEqual('function');
    done();
  });

  it('should not dispatch action when no dynamic role need change', async done => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => {
      return { ...mockState };
    });
    const testAssignRoles = [{ id: 24 }, { id: 33 }];
    const unwrappedCheckAndUpdateUserDynamicRoles = checkAndUpdateUserDynamicRoles(
      testAssignRoles
    );
    fetch.mockResponse(JSON.stringify({ success: true }));

    await unwrappedCheckAndUpdateUserDynamicRoles(mockDispatch, mockGetState);

    expect(mockGetState).toHaveBeenCalled();
    expect(mockDispatch.mock.calls.length).toBe(0);
    done();
  });

  it('should dispatch the correct actions for update uer dynamic roles failed', async done => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => {
      return { ...mockState };
    });
    const unwrappedCheckAndUpdateUserDynamicRoles = checkAndUpdateUserDynamicRoles(
      []
    );
    const fakeError = new Error('request failed');
    fetch.mockReject(fakeError);

    await unwrappedCheckAndUpdateUserDynamicRoles(mockDispatch, mockGetState);

    expect(mockGetState).toHaveBeenCalled();
    const [[firstCall], [secondCall]] = mockDispatch.mock.calls;
    expect(typeof firstCall).toEqual('function');
    expect(typeof secondCall).toEqual('function');
    done();
  });
});
