import {pool} from '../../../../db.js'
import { NextRequest } from "next/server.js";

export async function GET(
  req: any,
) {
  const query = await pool.query('SELECT * FROM public.comments_')
  return Response.json(query.rows)
}

export async function POST(
  req: NextRequest,
) {
  try {
    const test =  await req.json()
    const result = String(test.key)
    await pool.query(`INSERT INTO public.comments_ (created_at, content_) VALUES ('${new Date().toDateString()}', '${result}')`)
     return Response.json('Comentário criado com sucesso')
  } catch (err) {
    return Response.json(err)
  }

}