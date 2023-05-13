import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import ReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer,  } from 'enzyme-to-json';

Enzyme.configure({ adapter: new ReactAdapter() });

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}) as any)