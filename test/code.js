import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Hello from './Hello';
import * as actions from './redux/actions';

Hello = 'abc';

function abc() {
  const Hello = 'def';
  console.log(Hello);

  function ddd() {
    function eee() {
      console.log(123);
    }
  }
}

export class TestPage2 extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const def = 'test';
    return (
      <div className="home-test-page-2">
        <Hello />
        Page Content: home/TestPage2
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage2);
