import React from 'react';
import DatePicker from 'react-datepicker';

import {shallow} from 'enzyme';

import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='text' name='name' />);

    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);

    expect(component).toEqual({});
  });

  it('should render correct "name"', () => {
    const expectedName = 'title';

    const component = shallow(<OrderOption name={expectedName} type='text' />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
  });

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };
  
  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };
  
  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };
  
  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for (let type in optionTypes) {
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;
      
      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });

      /* common tests */
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });
  
      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          /* tests for dropdown */
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);
          
            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);
          
            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'number': {
          it('contains div with class number and input with class inputSmall', () => {
            const divNumber = renderedSubcomponent.find('.number');
            expect(divNumber.length).toBe(1);

            const inputSmallNumber = divNumber.find('input[type="number"]');
            expect(inputSmallNumber.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValueNumber});
          });
          break;
        }
        case 'icons': {
          it('contains divs with class icon', () => {
            const divIcon = renderedSubcomponent.find('.icon'); 
            expect(divIcon.length).toBe(3);

            const emptyDiv = divIcon.find('div[value=""]');
            expect(emptyDiv.length).toBe(0);

            const divWithIcon = divIcon.find('.icon .icon'); 
            expect(divWithIcon.length).toBe(mockProps.values.length); 

            //expect(divWithIcon.at(0).prop('value')).toBe(mockProps.values[0].id); 
            //expect(divWithIcon.at(1).prop('value')).toBe(mockProps.values[1].id); 
          });

          it('should run setOrderOption function on click', () => {
            renderedSubcomponent.find('.icon .icon').at(1).simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'date': {
          it('contains DatePicker', () => {
            const datePicker = renderedSubcomponent.find(DatePicker);
            expect(datePicker.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(DatePicker).simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          });
          break;
        }
        case 'text': {
          it('contains div with input type text', () => {
            const divText = renderedSubcomponent.find('div');
            expect(divText.length).toBe(1);

            const inputText = divText.find('input[type="text"]');
            expect(inputText.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input[type="text"]').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          });
          break;
        }
        case 'checkboxes': {
          it('contains div with class checkboxes and input with type checkbox', () => {
            const divCheckboxes = renderedSubcomponent.find('.checkboxes');
            expect(divCheckboxes.length).toBe(1);

            const checkboxInput = divCheckboxes.find('input[type="checkbox"]');
            expect(checkboxInput.length).toBe(mockProps.values.length);

            expect(checkboxInput.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(checkboxInput.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
          });
          break;
        }
      }
    });
  }
});