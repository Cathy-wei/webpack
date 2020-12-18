import React from 'react'
import {Form} from 'react-bootstrap'
export  default ({name}) => (
    <div>
        <Form.Control as="select" size="lg">
            <option>Select</option>
            <option>Lowest to highest</option>
            <option>Highest to lowest</option>
        </Form.Control>
    </div>
) 