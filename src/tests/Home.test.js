import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => ([
    {
      All: {
        confirmed: '205529',
        recovered: '0',
        deaths: '5878',
        country: 'Algeria',
      },
    },
    {
      All: {
        confirmed: '5069',
        recovered: '0',
        deaths: '174',
        country: 'Chad',
      },
    },
  ]),
  useDispatch: () => mockDispatch,
}));

jest.mock('../redux/countries/countries', () => ({
  loadContinent: () => ([
    {
      All: {
        confirmed: '205529',
        recovered: '0',
        deaths: '5878',
        country: 'Algeria',
      },
    },
    {
      All: {
        confirmed: '5069',
        recovered: '0',
        deaths: '174',
        country: 'Chad',
      },
    },
  ]),
}));

describe('Home page', () => {
  test('Snapshot test', () => {
    const home = renderer.create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )
      .toJSON();
    expect(home).toMatchSnapshot();
  });

  test('UI test', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Fire filter event', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    fireEvent.select(screen.getByRole('button'), {
      target: { eventKey: '99999' },
    });
    expect(screen.getByText(/Chad/)).toBeInTheDocument();
  });
});
