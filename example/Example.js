import Autocomplete from 'native-base-autocomplete'; /* eslint-disable-line import/no-unresolved */
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  Icon,
  List,
  ListItem
} from 'native-base';

const API = 'http://dummy.restapiexample.com/api/v1';

class Example extends Component {
  static renderEmployee(employee) {
    const { employee_name, employee_salary, employee_age } = employee;

    return (
      <View>
        <Text style={styles.titleText}>{employee_name}</Text>
        <Text style={styles.directorText}>$({employee_salary})</Text>
        <Text style={styles.openingText}>{employee_age} years old</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      query: '',
      selectedEmployee: null
    };
  }

  componentDidMount() {
    fetch(`${API}/employees`).then(res => res.json()).then((json) => {
      this.setState({ employees: json });
    });
  }

  findEmployee(query) {
    if (query === '') {
      return [];
    }

    const { employees } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return employees.filter(employee => employee.employee_name.search(regex) >= 0);
  }

  render() {
    const { query, selectedEmployee } = this.state;
    const employees = this.findEmployee(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Container style={styles.container}>
        <Content>
          <Item>
            <Input placeholder="a normal native-base Input" />
          </Item>
          <List>
            <ListItem>
              <Text>native base list item</Text>
            </ListItem>
          </List>
          <View style={styles.buttonContainer}>
            <Button style={styles.centerButton} primary={true}><Text> Native-Base </Text></Button>
            <Button style={styles.centerButton} success={true}><Text> Autocomplete </Text></Button>
            <Button style={styles.centerButton} danger={true}><Icon name="rocket" /><Text>Rocks!</Text></Button>
          </View>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            data={employees.length === 1 && comp(query, employees[0].employee_name)
              ? [] : employees}
            defaultValue={query}
            hideResults={selectedEmployee && selectedEmployee.employee_name === query}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Enter employee's name"
            renderItem={emp => <ListItem
              onPress={() => (
                this.setState({ query: emp.employee_name, selectedEmployee: emp })
              )}
            >
              <Text>{emp.employee_name} ({emp.employee_age})</Text>
            </ListItem>}
          />
          <View style={styles.descriptionContainer}>
            {employees.length > 0 ? (
              Example.renderEmployee(employees[0])
            ) : <Text style={styles.infoText}>Enter employee name</Text>
            }
          </View>
          <View style={{ height: 500, backgroundColor: 'transparent' }} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcfdff',
    flex: 1,
    paddingTop: 25
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    marginTop: 10
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  },
  buttonContainer: { flex: 1, alignSelf: 'center', paddingTop: 20 },
  centerButton: { margin: 10, alignSelf: 'center' }
});

export default Example;
