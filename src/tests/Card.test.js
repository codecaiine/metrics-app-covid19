import renderer from 'react-test-renderer';
import CountryCard from '../components/Card';

describe('Filter component', () => {
  test('Snapshot test', () => {
    const totalCard = renderer.create(
      <CountryCard country={{ All: { country: 'Algeria', confirmed: '205529' } }} />,
    )
      .toJSON();
    expect(totalCard).toMatchSnapshot();
  });
});
