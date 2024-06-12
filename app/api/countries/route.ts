import countries from './db.json'
 
export function GET() {
  return Response.json(countries)
}