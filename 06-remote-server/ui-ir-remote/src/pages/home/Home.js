import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/Layout';
import { fetchCommands, executeCommands, filterCommands, filterText } from './actions/homeActions';

export const mapStateToProps = (state) => {
  return state.home;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      return dispatch(fetchCommands());
    },
    executeCmd: (command) => {
      return dispatch(executeCommands(command));
    },
    filterCommands: () => {
      return dispatch(filterCommands());
    },
    changeSearchText: (searchText) => {
      return dispatch(filterText(searchText));
    }
  };
}

class RemotePage extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  renderButton() {
    return (
      <Row className="justify-content-center">
        {
          this.props.filteredCommands.map((command, index) => {
            return (
              <Col xs={10} sm={10} md={6} lg={4} xl={3} key={index}>
                <Button className={'w-100 mb-2'} onClick={() => {
                    this.props.executeCmd(command.path);
                  }}>
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
      <Layout searchText={this.props.filterText} onSearchClick={() => this.props.filterCommands()}
        onChange={(text) => this.props.changeSearchText(text)}>
        <Container>
          <Row className={'content'}>
            <Col>
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
