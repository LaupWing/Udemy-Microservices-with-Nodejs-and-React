import request from 'supertest'
import {app} from '../../app'

it('returns a  404 if the ticket is not found')