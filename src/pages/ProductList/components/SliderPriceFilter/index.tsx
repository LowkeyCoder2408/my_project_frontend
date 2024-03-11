import { useEffect, useState } from 'react';
import './SliderPriceFilter.css';

interface SliderPriceFilterProps {
  min: number;
  max: number;
  step: number;
  forid: string;
}

function SliderPriceFilter(props: SliderPriceFilterProps) {
  const [inputFrom, setInputFrom] = useState<number>(props.min);
  const [inputTo, setInputTo] = useState<number>(props.max);

  useEffect(() => {
    const display = document.getElementById(props.forid);
    const slider = document.getElementById(`slider-${props.forid}`);

    if (display) {
      if (inputFrom > inputTo) {
        display.innerHTML = `Khoảng giá: ${inputTo
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫ - ${inputFrom
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫`;
        if (slider) {
          slider.style.right = `${
            100 - ((inputFrom - props.min) / (props.max - props.min)) * 100
          }%`;
          slider.style.left = `${
            ((inputTo - props.min) / (props.max - props.min)) * 100
          }%`;
        }
      } else {
        display.innerHTML = `Khoảng giá: ${inputFrom
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫ - ${inputTo
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫`;
        if (slider) {
          slider.style.right = `${
            100 - ((inputTo - props.min) / (props.max - props.min)) * 100
          }%`;
          slider.style.left = `${
            ((inputFrom - props.min) / (props.max - props.min)) * 100
          }%`;
        }
      }
    }
    console.log(inputFrom, inputTo);
  }, [inputFrom, inputTo, props]);

  return (
    <div>
      <div className="my-3" id="display1"></div>
      <div className="range-slider">
        <span className="range-selected" id={`slider-${props.forid}`}></span>
      </div>
      <div className="range-scroll">
        <input
          onChange={(e) => setInputFrom(parseInt(e.target.value))}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          defaultValue={props.min}
        />
        <input
          onChange={(e) => setInputTo(parseInt(e.target.value))}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          defaultValue={props.max}
        />
      </div>
    </div>
  );
}

export default SliderPriceFilter;
