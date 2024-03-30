import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeDateToLocaleString(): boolean;
    }
  }
}

export const CustomMatchers = {
  toBeDateToLocaleString: function (): CustomMatcher {
    return {
      compare: function (actual: string): CustomMatcherResult {
        const result = {
          pass: true,
          message: '',
        };
        const dateSrtArr = actual.split(', ');
        if (dateSrtArr.length !== 2) {
          result.pass = false;
          result.message = `Expected ${actual} to be splitted into a 2-element substring with the "," separator.`;
        } else {
          const datePartsArr = dateSrtArr[0].split('.');
          const timePartsArr = dateSrtArr[1].split(':');
          if (datePartsArr.length !== 3 || timePartsArr.length !== 3) {
            result.pass = false;
            const _message1 = `Expected "dateParts" to be splitted into a 3-element substring with the "," separator.`;
            const _message2 = `Expected $"timeParts" to be splitted into a 3-element substring with the ":" separator.`;
            result.message =
              (datePartsArr.length !== 3 ? _message1 : '') +
              ' | ' +
              (timePartsArr.length !== 3 ? _message2 : '');
          } else {
            let _message1 = '',
              _message2 = '';
            let _numDate: number[] = [],
              _numTime: number[] = [];
            for (let el of datePartsArr) {
              if (
                !(
                  Object.prototype.toString.call(+el) === '[object Number]' &&
                  !isNaN(+el)
                )
              ) {
                result.pass = false;
                _message1 =
                  '|' +
                  _message1 +
                  '|' +
                  `Expect "datePart" ${el} to be parse into "number" type`;
              } else {
                _numDate.push(+el);
              }
            }
            for (let el of timePartsArr) {
              if (
                !(
                  Object.prototype.toString.call(+el) === '[object Number]' &&
                  !isNaN(+el)
                )
              ) {
                result.pass = false;
                _message1 =
                  '|' +
                  _message1 +
                  '|' +
                  `Expect "timePart" ${el} to be parse into "number" type`;
              } else {
                _numTime.push(+el);
              }
            }
            result.message = _message1 + _message2;
            const date = new Date(
              _numDate[2],
              _numDate[1] - 1,
              _numDate[0],
              _numTime[0],
              _numTime[1],
              _numTime[2]
            );
            if (
              !(
                Object.prototype.toString.call(date) === '[object Date]' &&
                !isNaN(date.getTime())
              )
            ) {
              result.pass = false;
              result.message =
                result.message +
                `Expected ${date} to be a Date Type from ${actual} which should created by method "toLocaleString()`;
            }
            if (date.toLocaleString() !== actual) {
              result.pass = false;
              result.message =
                result.message +
                `Expected ${actual} to be Equal to ${date.toLocaleString()}`;
            }
          }
        }

        return result;
      },
    };
  },
};
