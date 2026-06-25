create table public.salas_room (
  id          serial primary key,
  nombre      text not null,
  descripcion text,
  capacidad   int not null default 10,
  precio_hora numeric(8,2) not null,
  imagen_url  text,
  activa      boolean not null default true
);

insert into public.salas_room(nombre, descripcion, capacidad, precio_hora) values
  ('Sala Roja',  'escapa del modul0 1',  8, 80.00),
  ('Sala Negra', 'escapa del modulo 2',          15, 120.00),
  ('Sala Gold',  'si hubieses escapado antes no estarias aqui sufriendo en le modulo 3',     6,  150.00);

  create table public.reservas (
  id              bigserial primary key,
  sala_id         int not null references public.salas_room(id),
  cliente_id      uuid not null references public.perfiles(id),
  inicio          timestamptz not null,
  fin             timestamptz not null,
  estado          text not null default 'pendiente'
                  check (estado in ('pendiente','pagada','cancelada','completada')),
  estado_pago     text not null default 'pendiente'
                  check (estado_pago in ('pendiente','pagado','cancelado')),
  stripe_session  text,
  stripe_payment  text,
  qr_token        text unique,
  total           numeric(8,2) not null,
  usado_at        timestamptz,
  creado_en       timestamptz not null default now(),

  constraint sin_solapamiento exclude using gist (
    sala_id with =,
    tstzrange(inicio, fin) with &&
  ) where (estado not in ('cancelada'))
);

ALTER TABLE public.salas_room    ENABLE ROW LEVEL SECURITY;

-- ── reservas ──────────────────────────────────────────────────────────────────

create policy "cliente: ver sus reservas"
  on public.reservas for select
  using ( cliente_id = auth.uid() );

create policy "autenticado: crear reserva"
  on public.reservas for insert
  with check (
    cliente_id = auth.uid()
    and auth.role() = 'authenticated'
  );

-- Solo puede cambiar el estado de 'pendiente' → 'cancelada'
create policy "cliente: cancelar reserva pendiente"
  on public.reservas for update
  using (
    cliente_id = auth.uid()
    and estado = 'pendiente'
  )
  with check (
    cliente_id = auth.uid()
    and estado = 'cancelada'
  );

