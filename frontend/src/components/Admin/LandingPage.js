import React from 'react'
import {Tab, Tabs, Form, InputGroup, Button} from 'react-bootstrap'
import Page from '../Page'

function LandingPage() {
  return (
    <Page title="Landig Page">
      <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="landing-page" title="Landing Page">
        <h4 className='pt-4'>Activar / Desactivar páginas</h4>
        <hr/>
        <div>
            <Form>
                <Form.Check // prettier-ignore
                    type="switch"               
                    label="About Us"
                    defaultChecked={true}
                    id='aboutUs'
                    className='pt-2'
                />
                <Form.Check // prettier-ignore
                    type="switch"               
                    label="Contat Us"
                    defaultChecked={true}
                    id='contactUs'
                    className='pt-2'
                />
                <Form.Check // prettier-ignore
                    type="switch"               
                    label="Products"
                    defaultChecked={true}
                    id='products'
                    className='pt-2'
                />
                <Form.Check // prettier-ignore
                    type="switch"               
                    label="Services"
                    defaultChecked={true}
                    id='services'
                    className='pt-2 pb-3'
                />

                {/* <InputGroup className="pt-2">
                    <InputGroup.Text id="basic-addon1">About Us</InputGroup.Text>
                    <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup> */}
                <Button className='pt-2'>Guardar</Button>
            </Form>
        </div>

        
      </Tab>
      <Tab eventKey="profile" title="About Us">
        <h4 className='pt-4'>About Us</h4>
        <hr/>
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Texto que se despliega en la sección de About Us</Form.Label>
                    <Form.Control as="textarea" rows={10} />
                </Form.Group>
                <Button className='pt-2'>Guardar</Button>                
            </Form>
        </div>
      </Tab>
      <Tab eventKey="longer-tab" title="Products">
        Tab content for Loooonger Tab
      </Tab>
      <Tab eventKey="contact" title="Services" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>

    </Page>
  )
}

export default LandingPage
