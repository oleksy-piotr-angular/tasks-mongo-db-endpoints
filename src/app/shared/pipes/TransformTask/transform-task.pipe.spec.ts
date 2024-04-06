import { TransformTaskPipe } from './transform-task.pipe';

describe('TransformTaskPipe', () => {
  let pipe: TransformTaskPipe;
  beforeEach(() => {
    pipe = new TransformTaskPipe();
  });

  it('should create an Instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should change the first letter to uppercase and append the optional string parameter to the end of the string', () => {
    const text = 'this name must be Transformed';
    expect(pipe.transform(text, ' very well!')).toContain(
      'This name must be Transformed very well!'
    );
  });
});
