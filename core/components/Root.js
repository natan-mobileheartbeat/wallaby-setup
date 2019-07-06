// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import ConnectedRoutes from './Routes/ConnectedRoutes';
import mhLogger from '../utils/mhLogger/mhLogger';

type Props = {
  store: {},
  history: {}
};

// remove <ConnectedRouter history={this.props.history}>
export default class Root extends Component<Props> {
  constructor(props) {
    super(props);
    new mhLogger();
  }
  render() {
    //const contextRoot = process.env.CONTEXT_ROOT ? `/${process.env.CONTEXT_ROOT}` : '';
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Route component={ConnectedRoutes} />
        </ConnectedRouter>
      </Provider>
    );
  }
}
