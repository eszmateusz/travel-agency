import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' cost='cost' days={1} tags={['test', 'test']} />);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should generate correct link', () => { 
    const expectedLink = 'abc';
    const component = shallow(<TripSummary id={expectedLink} image='image' name='name' cost='name' days={1} tags={['test', 'test']} />);
    expect(component.find('.link').prop('to')).toEqual(`/trip/${expectedLink}`);
  });

  it('should render correct "src" and "alt"', () => {
    const expectedSrc = 'src';
    const expectedAlt = 'alt';
    const component = shallow(<TripSummary id='test' image={expectedSrc} name={expectedAlt} cost='{expectedCost}' days={1} tags={['test', 'test']} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render corret props', () => {
    const expectedName = 'name';
    const expectedCost = 'cost';
    const expactedDays = 1;

    const component = shallow(<TripSummary id='test' image='image' name={expectedName} cost={expectedCost} days={expactedDays} tags={['test', 'test']} />);

    const renderedName = component.find('.title').text();
    const renderedCost = component.find('.details').childAt(1).text();
    const renderedDays = component.find('.details').childAt(0).text();

    expect(renderedName).toEqual(expectedName);
    expect(renderedCost).toEqual(`from ${expectedCost}`);
    expect(renderedDays).toEqual(`${expactedDays} days`);
  });

  it('should render correst tags', () => {
    const expectedTags = ['1', '2', '3'];

    const component = shallow(<TripSummary id='test' image='image' name='name' cost='{expectedCost}' days={1} tags={expectedTags} />);

    for(let tag in expectedTags){
      const renderedTag = component.find('.tag').at(tag).text();
      expect(renderedTag).toEqual(expectedTags[tag]);
    }
  });

  it('should throw error without tags in div', () =>{
    const component = shallow(<TripSummary id='test' image='image' name='name' cost='{expectedCost}' days={1} tags={[]} />);
    const checkedDiv = component.find('.tags').exists();
    expect(checkedDiv).toEqual(false); 
  });
});