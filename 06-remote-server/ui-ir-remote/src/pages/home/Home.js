import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/Layout';
import { fetchCommands, executeCommands } from './actions/homeActions';

export const mapStateToProps = (state) => {
  console.log(state.home);
  return state.home;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      return dispatch(fetchCommands());
    },
    executeCmd: (command) => {
      return dispatch(executeCommands(command));
    }
  };
}

class RemotePage extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  renderButton() {
    return (
      <Row>
        {
          this.props.commands.map((command, index) => {
            return (
              <Col xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                <Button onClick={() => {
                    this.props.executeCmd(command);
                  }} className={'w-100 mb-2'}>
                  <h5>{`(${command.device}) ${command.operation}`}</h5>
                </Button>
              </Col>
            );
          })
        }
      </Row>
    );
  }

  render() {
    return (
      <Layout>
        <Container fluid>
          <Row className={'content'}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2>Remote UI</h2>
              <br />
            </Col>
          </Row>
          { this.renderButton() }
        </Container>
      </Layout>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemotePage);
