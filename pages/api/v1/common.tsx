import { NextApiRequest, NextApiResponse } from 'next';
import { unauthorisedResponse } from 'utils/response';
interface CommonCheckProps {
  req: NextApiRequest;
  res?: NextApiResponse;
  headType?: string;
  header?: string;
}
const commonCheck = async ({
  req,
  res,
  headType = 'Content-Type',
  header = 'application/json',
}: CommonCheckProps) => {
  res.setHeader(headType, header);
  const user = req.session.get('currentUser');
  if (!user) {
    res.json(unauthorisedResponse());
    res.end();
    return false;
  }
  return true;
};

export default commonCheck;
