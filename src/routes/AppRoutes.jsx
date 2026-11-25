import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import { Loader } from '../components/common/StateBlock'

const page = (loader) => lazy(loader)
const Home = page(() => import('../pages/public/Home'))
const Culture = page(() => import('../pages/public/Culture'))
const Edition2027 = page(() => import('../pages/public/Edition2027'))
const TemAliyaKozoh = page(() => import('../pages/public/TemAliyaKozoh'))
const Archives = page(() => import('../pages/public/Archives'))
const Communaute = page(() => import('../pages/public/Communaute'))
const Login = page(() => import('../pages/public/Login'))
const Register = page(() => import('../pages/public/Register'))
const NotFound = page(() => import('../pages/public/NotFound'))
const Dashboard = page(() => import('../pages/admin/Dashboard'))
const Editions = page(() => import('../pages/admin/Editions'))
const Candidatures = page(() => import('../pages/admin/Candidatures'))
const Contenus = page(() => import('../pages/admin/Contenus'))
const Medias = page(() => import('../pages/admin/Medias'))
const Messages = page(() => import('../pages/admin/Messages'))
const Membres = page(() => import('../pages/admin/Membres'))
const Parametres = page(() => import('../pages/admin/Parametres'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader className="min-h-[60vh]" />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="culture" element={<Culture />} />
          <Route path="edition-2027" element={<Edition2027 />} />
          <Route path="tem-aliya-kozoh" element={<TemAliyaKozoh />} />
          <Route path="archives" element={<Archives />} />
          <Route path="communaute" element={<Communaute />} />
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<Register />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="editions" element={<Editions />} />
          <Route path="candidatures" element={<Candidatures />} />
          <Route path="contenus" element={<Contenus />} />
          <Route path="medias" element={<Medias />} />
          <Route path="messages" element={<Messages />} />
          <Route path="membres" element={<Membres />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>
        <Route element={<PublicLayout />}><Route path="*" element={<NotFound />} /></Route>
      </Routes>
    </Suspense>
  )
}
