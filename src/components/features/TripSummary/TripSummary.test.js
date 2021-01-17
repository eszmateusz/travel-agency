import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' />);
    
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should generate correct link', () => { 
    const expectedLink = 'abc';
    const component = shallow(<TripSummary id={expectedLink} />);
    
    expect(component.find('.link').prop('to')).toEqual(`/trip/${expectedLink}`);
  });

  it('should render correct "src" and "alt"', () => {
    const expectedSrc = 'src';
    const expectedAlt = 'alt';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props', () => {
    const expectedName = 'name';
    const expectedCost = 'cost';
    const expactedDays = 1;

    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expactedDays} />);

    const renderedName = component.find('.title').text();
    const renderedCost = component.find('.details').childAt(1).text();
    const renderedDays = component.find('.details').childAt(0).text();

    expect(renderedName).toEqual(expectedName);
    expect(renderedCost).toEqual(`from ${expectedCost}`);
    expect(renderedDays).toEqual(`${expactedDays} days`);
  });

  it('should render correst tags', () => {
    const expectedTags = ['1', '2', '3'];

    const component = shallow(<TripSummary tags={expectedTags} />);

    for(let tag in expectedTags){
      const renderedTag = component.find('.tag').at(tag).text();
      expect(renderedTag).toEqual(expectedTags[tag]);
    }
  });

  it('should throw error without tags in div', () => {
    const component = shallow(<TripSummary days={1} tags={[]} />);
    const checkedDiv = component.find('.tags').exists();
    expect(checkedDiv).toEqual(false); 
  });
});