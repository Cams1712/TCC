import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { BsChevronDown } from 'react-icons/bs';
import './Accordion.css';

const AccordionComponent = ({ duvidas }) => (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    {duvidas !== undefined
      ? duvidas.map((duvida, index) => (
          <Accordion.Item
            className="AccordionItem"
            value={duvida.value}
            key={index}
          >
            <AccordionTrigger>{duvida.pergunta}</AccordionTrigger>
            <Accordion.Content className="AccordionContent">
              <div className="AccordionContentText">{duvida.resposta}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))
      : null}
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <BsChevronDown className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

export default AccordionComponent;
