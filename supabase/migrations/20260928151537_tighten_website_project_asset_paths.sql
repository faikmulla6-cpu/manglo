GRANT SELECT ("publicId","userId") ON TABLE public."WebsiteProject" TO authenticated;

CREATE POLICY "website_project_owner_storage_lookup"
ON public."WebsiteProject"
FOR SELECT
TO authenticated
USING ("userId" = (SELECT auth.uid()));

ALTER POLICY "website_project_assets_owner_insert"
ON storage.objects
WITH CHECK (
  bucket_id = 'website-project-assets'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  AND EXISTS (
    SELECT 1
    FROM public."WebsiteProject" project
    WHERE project."publicId" = (storage.foldername(name))[2]
      AND project."userId" = (SELECT auth.uid())
  )
);

ALTER POLICY "website_project_assets_owner_or_team_read"
ON storage.objects
USING (
  bucket_id = 'website-project-assets'
  AND (
    (
      (storage.foldername(name))[1] = (SELECT auth.uid())::text
      AND EXISTS (
        SELECT 1
        FROM public."WebsiteProject" project
        WHERE project."publicId" = (storage.foldername(name))[2]
          AND project."userId" = (SELECT auth.uid())
      )
    )
    OR EXISTS (
      SELECT 1
      FROM public."WebsiteProjectTeamAccess" team
      WHERE team."userId" = (SELECT auth.uid())
    )
  )
);

ALTER POLICY "website_project_assets_owner_delete"
ON storage.objects
USING (
  bucket_id = 'website-project-assets'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  AND EXISTS (
    SELECT 1
    FROM public."WebsiteProject" project
    WHERE project."publicId" = (storage.foldername(name))[2]
      AND project."userId" = (SELECT auth.uid())
  )
);
